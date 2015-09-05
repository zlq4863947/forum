package jp.co.ellite.forum.common;

import java.util.Locale;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.stereotype.Component;

@Component
public class ForumResourceBundleMessageSource extends
		ReloadableResourceBundleMessageSource implements ForumMessageSource {

	private Object defaultLocale;

	protected Locale getDefaultLocale() {

		return (Locale) (this.defaultLocale != null ? this.defaultLocale
				: LocaleContextHolder.getLocale());
	}
}
