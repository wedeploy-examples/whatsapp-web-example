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

extension UIColor {
	
	convenience init(_ red: Int, _ green: Int, _ blue: Int, _ alpha: CGFloat) {

		self.init(red: CGFloat(red)/255.0, green: CGFloat(green)/255.0, blue: CGFloat(blue)/255.0, alpha: alpha)
	}

	convenience init(_ rgba: String) {
		var red: CGFloat = 0.0
		var green: CGFloat = 0.0
		var blue: CGFloat = 0.0
		var alpha: CGFloat = 1.0

		if rgba.hasPrefix("#") {
			let index   = rgba.characters.index(rgba.startIndex, offsetBy: 1)
			let hex     = rgba.substring(from: index)
			let scanner = Scanner(string: hex)
			var hexValue: CUnsignedLongLong = 0
			if scanner.scanHexInt64(&hexValue) {
				switch hex.characters.count {
				case 3:
					red   = CGFloat((hexValue & 0xF00) >> 8)       / 15.0
					green = CGFloat((hexValue & 0x0F0) >> 4)       / 15.0
					blue  = CGFloat(hexValue & 0x00F)              / 15.0
				case 4:
					red   = CGFloat((hexValue & 0xF000) >> 12)     / 15.0
					green = CGFloat((hexValue & 0x0F00) >> 8)      / 15.0
					blue  = CGFloat((hexValue & 0x00F0) >> 4)      / 15.0
					alpha = CGFloat(hexValue & 0x000F)             / 15.0
				case 6:
					red   = CGFloat((hexValue & 0xFF0000) >> 16)   / 255.0
					green = CGFloat((hexValue & 0x00FF00) >> 8)    / 255.0
					blue  = CGFloat(hexValue & 0x0000FF)           / 255.0
				case 8:
					red   = CGFloat((hexValue & 0xFF000000) >> 24) / 255.0
					green = CGFloat((hexValue & 0x00FF0000) >> 16) / 255.0
					blue  = CGFloat((hexValue & 0x0000FF00) >> 8)  / 255.0
					alpha = CGFloat(hexValue & 0x000000FF)         / 255.0
				default:
					print("Invalid RGB string")
				}
			} else {
				print("Scan hex error")
			}
		} else {
			print("Invalid RGB string, missing '#' as prefix", terminator: "")
		}

		self.init(red:red, green:green, blue:blue, alpha:alpha)
	}

	static var chatColors: [UIColor] {
		return [
			UIColor("#ef4b4f"),
			UIColor("#35cd96"),
			UIColor("#6bcbef"),
			UIColor("#e542a3"),
			UIColor("#91ab01"),
			UIColor("#ffa97a"),
			UIColor("#1f7aec"),
			UIColor("#dfb610"),
			UIColor("#029d00"),
			UIColor("#8b7add"),
			UIColor("#fe7c7f"),
			UIColor("#ba33dc"),
			UIColor("#59d368"),
			UIColor("#b04632"),
			UIColor("#fd85d4"),
			UIColor("#8393ca"),
			UIColor("#ff8f2c"),
			UIColor("#a3e2cb"),
			UIColor("#b4876e"),
			UIColor("#c90379")
		]
	}
}
