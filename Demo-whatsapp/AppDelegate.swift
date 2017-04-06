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

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

	var window: UIWindow?

	static var currentUser: Author?

	func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
		loadOrCreateCurrentUser()
		return true
	}

	func loadOrCreateCurrentUser() {

		let userDefaults = UserDefaults.standard

		if let id = userDefaults.string(forKey: "id") {
			let color = userDefaults.integer(forKey: "color")
			let name = userDefaults.string(forKey: "name")
			AppDelegate.currentUser = Author(id: id, name: name!, color: color)
		}
		else {
			let user = getRandomUser()
			userDefaults.set(user.id, forKey: "id")
			userDefaults.set(user.name, forKey: "name")
			userDefaults.set(user.color, forKey: "color")
			userDefaults.synchronize()
			AppDelegate.currentUser = user
		}
	}

	func getRandomUser() -> Author {
		let userIndex = Int(arc4random_uniform(UInt32(randomUsers.count)));
		let colorIndex = Int(arc4random_uniform(UInt32(UIColor.chatColors.count)));
		let name = randomUsers[userIndex]

		return Author(name: name, color: colorIndex)
	}

	let randomUsers = [
		"Jospeh",
		"Rosemary",
		"Gregg",
		"Nohemi",
		"Helene",
		"Irish",
		"Reginia",
		"Antonietta",
		"Major",
		"Dovie",
		"Alona",
		"Margarette",
		"Bob",
		"Meghan",
		"Maia",
		"Arnold",
		"Jamar",
		"Tyra",
		"Kamilah",
		"Tam",
		"Noble",
		"Cordia",
		"Tana",
		"Antone",
		"Santiago",
		"Grant",
		"Olene",
		"Rosa",
		"Arturo",
		"Lowell",
		"Dorotha",
		"Carolyne",
		"Lelah",
		"Troy",
		"Nia",
		"Waltraud",
		"Luther",
		"Shira",
		"Pilar",
		"Bulah",
		"Danna",
		"Elwanda",
		"Leroy",
		"Jimmie",
		"Dwight",
		"Criselda",
		"Geneva",
		"Carlton",
		"Alfred",
		"Barton"
	]
}

