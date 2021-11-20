

class ChatError extends Error {
  errors;

  constructor(message: string, errors = []) {
    super(message);
    this.errors = errors;
  }

  static RequiredNicknameAndRoomError() {
    return new ChatError('Требуется имя пользователя и комнаты');
  }
  
  static NameAlreadyInUse() {
    return new ChatError('Имя пользователя уже используется');
  }

}

export default ChatError;