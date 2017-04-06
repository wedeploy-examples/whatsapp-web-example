//
//  ViewController.swift
//  Demo-whatsapp
//
//  Created by Victor Galán on 04/04/2017.
//  Copyright © 2017 liferay. All rights reserved.
//

import UIKit
import SlackTextViewController
import WeDeploy
import SocketIO

class ViewController: SLKTextViewController {

	var messages = [Message]()
	var currentUser: Author!
	var socket: SocketIOClient?

	override var tableView: UITableView {
		return super.tableView!
	}

	override func viewDidLoad() {
		super.viewDidLoad()

		currentUser = AppDelegate.currentUser

		self.tableView.tableFooterView = UIView()

		self.tableView.register(UINib(nibName: "MessageCell", bundle: nil),
			forCellReuseIdentifier: "personalMessage")
		self.tableView.register(UINib(nibName: "OtherMessageCell", bundle: nil),
			forCellReuseIdentifier: "otherMessage")
		self.tableView.backgroundColor = .clear
		self.tableView.backgroundView = nil
		self.tableView.separatorStyle = .none

		let background = UIImageView(image: UIImage(named: "bg.jpg"))
		background.contentMode = .scaleToFill

		background.autoresizingMask = [.flexibleHeight, .flexibleWidth]
		self.view.addSubview(background)
		self.view.sendSubview(toBack: background)

		WeDeploy.data("http://data.whatsapp.wedeploy.io")
			.orderBy(field: "id", order: .ASC)
			.limit(100)
			.get(resourcePath: "messages")
			.then { [weak self] messages -> Void in
				self?.messages = messages.map({ Message(json: $0) }).reversed()
				self?.tableView.reloadData()
			}
			.catch { error in
				print(error)
		}

		socket = WeDeploy.data("http://data.whatsapp.wedeploy.io")
			.orderBy(field: "id", order: .DESC)
			.limit(1)
			.watch(resourcePath: "messages")

		socket?.on(.changes) { [unowned self ] event in
			let messageRaw = event.document["changes"] as! [[String: Any]]

			let message = Message(json: messageRaw[0])

			if !self.messages.contains(where: {$0.id == message.id}) {
				let indexPath = IndexPath(row: 0, section: 0)
				self.messages.insert(message, at: 0)
				self.tableView.insertRows(at: [indexPath], with: .automatic)
			}
		}
	}

	override class func tableViewStyle(for decoder: NSCoder) -> UITableViewStyle {
		return .plain
	}

	override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
		return messages.count
	}

	override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
		let message = messages[indexPath.row]
		let identifier = message.author.id == currentUser.id ? "personalMessage" : "otherMessage"
		let cell = tableView.dequeueReusableCell(withIdentifier: identifier, for: indexPath) as! MessageCell

		cell.message = message.content
		cell.author = message.author.name
		cell.authorColor = message.author.color
		cell.date = message.time
		
		cell.transform = tableView.transform

		return cell
	}

	override func didPressRightButton(_ sender: Any?) {
		let content = self.textView.text!
		self.textView.text = ""

		let message = Message(author: currentUser, content: content)

		WeDeploy.data("http://data.whatsapp.wedeploy.io")
			.create(resource: "messages", object: message.toJson())
			.then { _ in
				print("created")
			}
			.catch { error in
				print("Error creating the message \(error)")
			}

		let indexPath = IndexPath(row: 0, section: 0)
		self.messages.insert(message, at: 0)
		self.tableView.insertRows(at: [indexPath], with: .bottom)
	}

	override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {

		let message = self.messages[(indexPath as NSIndexPath).row].content

		let paragraphStyle = NSMutableParagraphStyle()
		paragraphStyle.lineBreakMode = .byWordWrapping
		paragraphStyle.alignment = .left

		let pointSize: CGFloat = 17

		let attributes = [
			NSFontAttributeName : UIFont.systemFont(ofSize: pointSize),
			NSParagraphStyleAttributeName : paragraphStyle
		]

		let width: CGFloat = MessageCell.MaxMessageWidth - 8

		let titleBounds = (message as NSString).boundingRect(with:
				CGSize(width: width, height: CGFloat.greatestFiniteMagnitude),
				options: .usesLineFragmentOrigin, attributes: attributes, context: nil)

		var height = titleBounds.height
		height += 22 + 21 + 5 + 5

		return height
	}

	@IBOutlet weak var logoImage: UIImageView! {
		didSet {
			logoImage.layer.cornerRadius = logoImage.frame.width/2
			logoImage.layer.masksToBounds = true
		}
	}
}

