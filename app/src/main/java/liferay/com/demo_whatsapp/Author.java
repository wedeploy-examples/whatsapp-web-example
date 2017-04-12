package liferay.com.demo_whatsapp;


import org.json.JSONObject;

public final class Author {

	private final String id;
	private final String name;
	private final int color;

	public Author(String id, String name, int color) {
		this.id = id;
		this.name = name;
		this.color = color;
	}

	public static Author fromJson(JSONObject jsonObject) {
		String id = jsonObject.optString("id");
		String name = jsonObject.optString("name");
		String colorString = jsonObject.optString("color");

		int color = Integer.parseInt(colorString.split("-")[1]);
		return new Author(id, name, color);
	}

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public int getColor() {
		return color;
	}
}
