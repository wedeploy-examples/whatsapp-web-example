/**
* Copyright (c) 2000-present Liferay, Inc. All rights reserved.
*
* This library is free software; you can redistribute it and/or modify it under
* the terms of the GNU Lesser General Public License as published by the Free
* Software Foundation; either version 2.1 of the License, or (at your option)
* any later version.
*
* This library is distributed in the hope that it will be useful, but WITHOUT
* ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
* FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
* details.
*/

import UIKit

class MessageCell: UITableViewCell {

	static let MaxMessageWidth: CGFloat = UIScreen.main.bounds.width * 0.8

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

		messageLabel.font = UIFont.systemFont(ofSize: MessageCell.defaultFontSize())

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

	static func defaultFontSize() -> CGFloat {
		return 17
	}
    
}
