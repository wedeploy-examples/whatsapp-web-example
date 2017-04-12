package liferay.com.demo_whatsapp;

import org.json.JSONObject;

public final class Message {

	private final String id;
	private final String time;
	private final String content;
	private final Author author;

	public Message(String id, String time, String content, Author author) {
		this.id = id;
		this.time = time;
		this.content = content;
		this.author = author;
	}

	public Message(String time, String content, Author author) {
		this.id = "uuid" + System.currentTimeMillis();
		this.time = time;
		this.content = content;
		this.author = author;
	}

	public static Message fromJson(JSONObject jsonObject) {
		String id = jsonObject.optString("id");
		String time = jsonObject.optString("time");
		String content = jsonObject.optString("content");

		Author author = Author.fromJson(jsonObject.optJSONObject("author"));

		return new Message(id, time, content, author);
	}

	public String getId() {
		return id;
	}

	public String getTime() {
		return time;
	}

	public String getContent() {
		return content;
	}

	public Author getAuthor() {
		return author;
	}
}
