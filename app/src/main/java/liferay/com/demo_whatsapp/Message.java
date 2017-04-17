package liferay.com.demo_whatsapp;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Locale;
import org.json.JSONException;
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

	public Message(String content, Author author) {
		long milis = System.currentTimeMillis();
		this.id = "uuid" + milis;
		this.time = dateFormat.format(milis);
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

	public JSONObject toJson() throws JSONException {
		JSONObject jsonObject = new JSONObject();

		jsonObject.put("id", id);
		jsonObject.put("time", time);
		jsonObject.put("content", content);
		jsonObject.put("author", author.toJson());

		return jsonObject;
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

	private static SimpleDateFormat dateFormat = new SimpleDateFormat("hh:mm a", new Locale("en_US_POSIX"));

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;

		Message message = (Message) o;

		return id != null ? id.equals(message.id) : message.id == null;
	}
}