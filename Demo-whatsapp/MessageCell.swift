//
//  MessageCell.swift
//  Demo-whatsapp
//
//  Created by Victor Galán on 05/04/2017.
//  Copyright © 2017 liferay. All rights reserved.
//

import UIKit

class MessageCell: UITableViewCell {

	static let MaxMessageWidth: CGFloat = 310

	var message: String? {
		didSet {
			messageLabel.text = message
			updateSelfWidth(message: message!)
		}
	}

	var author: String? {
		didSet {
			authorLabel.text = author
		}
	}

	var authorColor: Int? {
		didSet {
			authorLabel.textColor = UIColor.chatColors[authorColor ?? 0]
		}
	}

	var date: String? {
		didSet {
			dateLabel.text = date
		}
	}

	var maxConstraint: CGFloat!

	@IBOutlet weak var dateLabel: UILabel!
	@IBOutlet weak var messageLabel: UILabel!
	@IBOutlet weak var authorLabel: UILabel!
	@IBOutlet weak var widthConstraint: NSLayoutConstraint!

	@IBOutlet weak var shadowView: UIView! {
		didSet {
			shadowView.layer.shadowColor = UIColor.black.cgColor
			shadowView.layer.shadowOffset = CGSize(width: 0, height: 1);
			shadowView.layer.shadowRadius = 5;
			shadowView.layer.shadowOpacity = 0.1;
			shadowView.layer.masksToBounds = false
		}
	}

	@IBOutlet weak var messageView: UIView! {
		didSet {
			messageView.layer.cornerRadius = 10
			messageView.clipsToBounds = true
		}
	}

    override func awakeFromNib() {
        super.awakeFromNib()

		maxConstraint = MessageCell.MaxMessageWidth

		backgroundColor = .clear
		selectionStyle = .none
    }

	func updateSelfWidth(message: String) {
		let textLabel = UILabel()
		textLabel.text = message
		textLabel.sizeToFit()

		let constant = min(textLabel.frame.width, maxConstraint)
		self.widthConstraint.constant = max(constant + 16, 116)
	}
    
}
