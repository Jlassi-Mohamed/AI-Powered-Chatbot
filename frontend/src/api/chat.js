import API from "./axios";

export const sendMessage = (model, query, conversationId = null, language = "en") => {
  const payload = { model_name: model, query, language };
  if (conversationId) payload.conversation_id = conversationId; 
  return API.post("chat/query/", payload);
};


export const getConversations = () => {
  return API.get("chat/conversations/");
};

export const getMessages = (conversationId) => {
  return API.get(`chat/conversations/${conversationId}/`);
};

export const deleteConversation = (conversationId) => {
  return API.delete(`chat/conversations/${conversationId}/delete/`)
}