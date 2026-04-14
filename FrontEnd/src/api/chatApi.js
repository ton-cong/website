import axiosClient from './axiosClient';

const chatApi = {
    sendMessage(data) {
        const url = '/chat/messages';
        return axiosClient.post(url, data);
    },

    getMessages(conversationId) {
        const url = `/chat/messages/${conversationId}`;
        return axiosClient.get(url);
    },

    getConversations() {
        const url = '/chat/conversations';
        return axiosClient.get(url);
    },
};

export default chatApi;
