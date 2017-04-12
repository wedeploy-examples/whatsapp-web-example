package liferay.com.demo_whatsapp;


import android.app.Application;
import android.content.Context;
import android.content.res.Resources;
import android.graphics.Color;
import android.support.v4.content.ContextCompat;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.List;

public class ChatAdapter extends RecyclerView.Adapter<ChatAdapter.ChatViewHolder> {

	private List<Message> messages;
	private Context context;

	public ChatAdapter(List<Message> messages, Context context) {
		this.messages = messages;
	}

	@Override
	public ChatViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
		View view;
		if (viewType == 0) {
			view = LayoutInflater.from(parent.getContext()).inflate(R.layout.personal_message_item, parent, false);
		}
		else {
			view = LayoutInflater.from(parent.getContext()).inflate(R.layout.other_message_item, parent, false);
		}
		return new ChatViewHolder(view);
	}

	@Override
	public void onBindViewHolder(ChatViewHolder holder, int position) {
		holder.bind(messages.get(position));
	}

	@Override
	public int getItemViewType(int position) {
		return position % 2 == 0 ? 0: 1;
	}

	@Override
	public int getItemCount() {
		return messages.size();
	}

	static class ChatViewHolder extends RecyclerView.ViewHolder {
		private TextView author;
		private TextView content;
		private TextView date;
		private Context context;

		public ChatViewHolder(View itemView, Context context) {
			super(itemView);
			this.context = context;
			author = (TextView) itemView.findViewById(R.id.author);
			content = (TextView) itemView.findViewById(R.id.content);
			date = (TextView) itemView.findViewById(R.id.date);
		}

		public void bind(Message message) {
			author.setText(message.getAuthor().getName());
			author.setTextColor(Color.parseColor());
			content.setText(message.getContent());
			date.setText(message.getTime());
		}
	}
}
