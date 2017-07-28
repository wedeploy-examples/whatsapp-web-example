package liferay.com.demo_whatsapp;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;
import com.wedeploy.android.Callback;
import com.wedeploy.android.RealTime;
import com.wedeploy.android.WeDeploy;
import com.wedeploy.android.query.SortOrder;
import com.wedeploy.android.transport.Response;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import org.json.JSONArray;
import org.json.JSONException;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

	private static String DATA_URL = "https://data-whatsapp.wedeploy.sh";
	private static String LOG_ID = "Demo-whatsapp";

	private RecyclerView recyclerView;
	private EditText editText;
	private ImageButton sendButton;

	private List<Message> messages = new ArrayList<>();
	private ChatAdapter adapter;
	private Author author;

	private WeDeploy weDeploy;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		loadOrCreateUser();

		bindViews();

		adapter = new ChatAdapter(messages, author);
		recyclerView.setAdapter(adapter);

		weDeploy = new WeDeploy.Builder().build();

		weDeploy.data(DATA_URL)
			.limit(100)
			.orderBy("id", SortOrder.ASCENDING)
			.get("messages")
			.execute(new Callback() {
				@Override
				public void onSuccess(Response response) {
					try {
						JSONArray array = new JSONArray(response.getBody());
						List<Message> newMessages = new ArrayList<>(array.length());
						for (int i = 0; i < array.length(); i++) {
							newMessages.add(Message.fromJson(array.getJSONObject(i)));
						}

						messages.addAll(newMessages);
						adapter.notifyDataSetChanged();
					} catch (JSONException e) {
						Log.e(LOG_ID, "" + e);
					}
				}

				@Override
				public void onFailure(Exception e) {
					Log.e("Error", "" + e);
				}
			});

		weDeploy.data(DATA_URL)
			.orderBy("id", SortOrder.DESCENDING)
			.limit(1)
			.watch("messages")
			.on("changes", new RealTime.OnEventListener() {
				@Override
				public void onEvent(final Object... objects) {
					runOnUiThread(new Runnable() {
						@Override
						public void run() {
							try {
								JSONArray array = (JSONArray) objects[0];
								Message message = Message.fromJson(array.getJSONObject(0));
								if (!messages.contains(message)) {
									addMessage(message);
								}
							} catch (JSONException e) {
								Log.e(LOG_ID, "" + e);
							}
						}
					});
				}
			});
	}

	@Override
	public void onClick(View view) {
		createAndAddMessage(editText.getText().toString());
	}

	private void bindViews() {
		recyclerView = (RecyclerView) findViewById(R.id.recyclerViewChat);
		editText = (EditText) findViewById(R.id.editMessage);
		sendButton = (ImageButton) findViewById(R.id.send_button);
		sendButton.setOnClickListener(this);

		LinearLayoutManager linearLayoutManager =
			new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false);
		linearLayoutManager.setStackFromEnd(true);

		recyclerView.setHasFixedSize(true);
		recyclerView.setLayoutManager(linearLayoutManager);
		recyclerView.setItemAnimator(new DefaultItemAnimator());

		editText.setOnEditorActionListener(new TextView.OnEditorActionListener() {
			@Override
			public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
				boolean handled = false;
				if (actionId == EditorInfo.IME_ACTION_SEND) {
					createAndAddMessage(v.getText().toString());
					handled = true;
				}
				return handled;
			}
		});

		Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
		setSupportActionBar(toolbar);
	}

	private void createAndAddMessage(String content) {
		if (!content.isEmpty()) {
			Message message = new Message(content, author);
			try {
				weDeploy.data(DATA_URL)
					.create("messages", message.toJson())
					.execute(new Callback() {
						@Override
						public void onSuccess(Response response) {
							Log.d(LOG_ID, "Message added");
						}

						@Override
						public void onFailure(Exception e) {
							Log.e(LOG_ID, "" + e);
						}
					});
			} catch (JSONException e) {
				Log.e(LOG_ID, "" + e);
			}
			addMessage(message);

			editText.setText("");
		}
	}

	private void addMessage(Message message) {
		messages.add(message);
		int lastPosition = messages.size() - 1;
		adapter.notifyItemInserted(lastPosition);
		recyclerView.scrollToPosition(lastPosition);
	}

	private void loadOrCreateUser() {
		SharedPreferences sharedPreferences = getSharedPreferences("currentUser", MODE_PRIVATE);
		String id = sharedPreferences.getString("id", null);
		int nameIdx = 0;
		int colorIdx = 0;

		if (id == null) {
			id = UUID.randomUUID().toString();
			nameIdx = new Random().nextInt(Names.names.length);
			colorIdx = new Random().nextInt(Colors.chatColor.length);

			SharedPreferences.Editor editor = sharedPreferences.edit();
			editor.putString("id", id);
			editor.putInt("name", nameIdx);
			editor.putInt("color", colorIdx);
			editor.apply();
		}
		else {
			nameIdx = sharedPreferences.getInt("name", 0);
			colorIdx = sharedPreferences.getInt("color", 0);
		}

		author = new Author(id, Names.names[nameIdx], colorIdx);
	}
}
