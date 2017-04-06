//
//  AppDelegate.swift
//  Demo-whatsapp
//
//  Created by Victor Galán on 04/04/2017.
//  Copyright © 2017 liferay. All rights reserved.
//

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

