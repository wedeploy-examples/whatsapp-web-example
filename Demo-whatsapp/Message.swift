//
//  Message.swift
//  Demo-whatsapp
//
//  Created by Victor Galán on 05/04/2017.
//  Copyright © 2017 liferay. All rights reserved.
//

import Foundation

struct Message {
	let id: String
	let author: Author
	let content: String
	let time: String

	init(id: String = "uuid\(Date().timeIntervalSince1970)",
		author: Author, content: String, time: String = Message.defaultTime()) {
		self.id = id
		self.author = author
		self.content = content
		self.time = time
	}

	init(json: [String: Any]) {
		self.id = json["id"] as! String
		self.author = Author(json: json["author"] as! [String: Any])
		self.content = json["content"] as! String
		self.time = json["time"] as! String
	}

	static func defaultTime() -> String {
		let dateFormatter = DateFormatter()
		dateFormatter.locale = Locale(identifier: "en_US_POSIX")
		dateFormatter.dateFormat = "hh:mm a"

		return dateFormatter.string(from: Date())
	}

	func toJson() -> [String: Any] {
		return ["id": id, "author": author.toJson(), "content": content, "time": time]
	}
}

struct Author {
	let id: String
	let name: String
	let color: Int

	init(id: String = UUID().uuidString, name: String, color: Int) {
		self.id = id
		self.name = name
		self.color = color
	}

	init(json: [String: Any]) {
		self.id = json["id"] as! String
		self.name = json["name"] as! String
		let color = json["color"] as! String
		self.color = Int((String(color.characters.split(separator: "-")[1])))!
	}

	func toJson() -> [String: Any] {
		return  ["id": id, "name" : name, "color": "color-\(color)"]
	}
}
