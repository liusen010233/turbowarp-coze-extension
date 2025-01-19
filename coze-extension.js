(function(Scratch) {
    'use strict';
    
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
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Origin': 'https://turbowarp.org',
                        'Access-Control-Allow-Origin': '*'
                    },
                    mode: 'cors',
                    credentials: 'omit',
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
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('Coze API 响应:', data);
                
                if (data.choices && data.choices.length > 0) {
                    return data.choices[data.choices.length - 1].message.content;
                }
                if (data.message) {
                    return data.message.content;
                }
                if (data.error) {
                    return `API错误: ${data.error.message || JSON.stringify(data.error)}`;
                }
                return JSON.stringify(data);
            } catch (error) {
                console.error('Coze API 错误:', error);
                return `错误：${error.message}\n请检查控制台获取详细信息`;
            }
        }
    }

    if (Scratch) {
        Scratch.extensions.register(new CozeExtension());
    }
})(window.Scratch);
