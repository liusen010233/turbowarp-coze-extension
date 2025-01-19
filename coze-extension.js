class CozeExtension {
    getInfo() {
        return {
            id: 'cozeapi',
            name: 'Coze API',
            blocks: [
                {
                    opcode: 'askCoze',
                    blockType: 'reporter',
                    text: '向Coze发送消息 [message]',
                    arguments: {
                        message: {
                            type: 'string',
                            defaultValue: '早上好'
                        }
                    }
                }
            ]
        };
    }

    async askCoze(args) {
        try {
            const response = await fetch('https://api.coze.cn/v3/chat', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer pat_gtKhkUODKyPYlOFBNzF4MWKfSSCenMIaoNkSZXiyaJJUjrRcoVFvpmR4MqwxhYX1',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    bot_id: "7461612810762665993",
                    user_id: "7461462845398482955",
                    stream: false,
                    auto_save_history: true,
                    additional_messages: [
                        {
                            role: "user",
                            content: args.message,
                            content_type: "text"
                        }
                    ]
                })
            });
            
            const data = await response.json();
            // 打印完整响应以便调试
            console.log('Coze API 响应:', data);
            
            // 如果 data.choices 存在，返回最后一条消息的内容
            if (data.choices && data.choices.length > 0) {
                return data.choices[data.choices.length - 1].message.content;
            }
            // 如果 data.message 存在，返回其内容
            if (data.message) {
                return data.message.content;
            }
            // 返回完整的响应数据用于调试
            return JSON.stringify(data);
        } catch (error) {
            console.error('Coze API 错误:', error);
            return '错误：' + error.message;
        }
    }
}

Scratch.extensions.register(new CozeExtension());