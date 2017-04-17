package liferay.com.demo_whatsapp;


import org.json.JSONException;
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

	public JSONObject toJson() throws JSONException {
		JSONObject jsonObject = new JSONObject();

		jsonObject.put("id", id);
		jsonObject.put("name", name);
		jsonObject.put("color", "color-" + color);

		return jsonObject;
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

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;

		Author author = (Author) o;

		return id != null ? !id.equals(author.id) : author.id != null;
	}
}
