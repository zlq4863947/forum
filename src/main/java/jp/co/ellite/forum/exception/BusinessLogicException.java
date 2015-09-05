package jp.co.ellite.forum.exception;

public class BusinessLogicException extends Exception {

	private static final long serialVersionUID = 2606143836145079830L;

	private String messageCode;

	public BusinessLogicException(String messageCode) {
		super();
		this.messageCode = messageCode;
	}

	public BusinessLogicException(String messageCode, String message) {
		super(message);
		this.messageCode = messageCode;
	}

	public BusinessLogicException(String messageCode, Throwable cause) {
		super(cause);
		this.messageCode = messageCode;
	}

	public BusinessLogicException(String messageCode, String message,
			Throwable cause) {
		super(message, cause);
		this.messageCode = messageCode;
	}

	public String getMessageCode() {
		return messageCode;
	}

}
