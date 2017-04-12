package liferay.com.demo_whatsapp;

import android.os.Debug;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.wedeploy.sdk.Callback;
import com.wedeploy.sdk.WeDeploy;
import com.wedeploy.sdk.auth.Auth;
import com.wedeploy.sdk.transport.Response;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

	private RecyclerView recyclerView;
	private EditText editText;
	private ImageButton sendButton;

	private List<String> messages = new ArrayList<>();
	private ChatAdapter adapter;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		Author author = new Author(UUID.randomUUID().toString(), "Rossmery", "color-3");

		recyclerView = (RecyclerView) findViewById(R.id.recyclerViewChat);
		editText = (EditText) findViewById(R.id.editMessage);
		sendButton = (ImageButton) findViewById(R.id.send_button);
		sendButton.setOnClickListener(this);

		LinearLayoutManager linearLayoutManager = new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false);
		linearLayoutManager.setStackFromEnd(true);

		recyclerView.setHasFixedSize(true);
		recyclerView.setLayoutManager(linearLayoutManager);
		recyclerView.setItemAnimator(new DefaultItemAnimator());

		adapter = new ChatAdapter(messages);
		recyclerView.setAdapter(adapter);

		editText.setOnEditorActionListener(new TextView.OnEditorActionListener() {
			@Override
			public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
				boolean handled = false;
				if (actionId == EditorInfo.IME_ACTION_SEND) {
					addMessage(v.getText().toString());
					handled = true;
				}
				return handled;
			}
		});

		WeDeploy weDeploy = new WeDeploy.Builder().build();

		weDeploy.data("http://data.whatsapp.wedeploy.io")
			.get("messages")
			.execute(new Callback() {
				@Override
				public void onSuccess(Response response) {
					try {
						JSONArray array = new JSONArray(response.getBody());
						List<Message> messages1 = new ArrayList<Message>(array.length());
						for (int i = 0; i < array.length(); i++) {
							messages1.add(Message.fromJson(array.getJSONObject(i)));
						}

						Log.d("AAAA", messages1.toString());
					} catch (JSONException e) {
						e.printStackTrace();
					}
				}

				@Override
				public void onFailure(Exception e) {
					Log.e("Error", ""+e);
				}
			});
	}

	@Override
	public void onClick(View view) {
		addMessage(editText.getText().toString());
	}

	private void addMessage(String message) {
		if (message.isEmpty()) {
			return;
		}

		editText.setText("");
		messages.add(message);
		int lastPosition = messages.size() - 1;
		adapter.notifyItemInserted(lastPosition);
		recyclerView.scrollToPosition(lastPosition);
	}
}
