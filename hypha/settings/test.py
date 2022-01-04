import logging

from .base import *  # noqa

logging.disable(logging.CRITICAL)


# Should only include explicit testing settings

SECRET_KEY = 'NOT A SECRET'

PROJECTS_ENABLED = True
PROJECTS_AUTO_CREATE = True

TRANSITION_AFTER_REVIEWS = 2

STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'

PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.MD5PasswordHasher',
]
WEBPACK_LOADER['DEFAULT'].update({
    'STATS_FILE': os.path.join(BASE_DIR, r'hypha\static_compiled\app\webpack-stats.json'),
})

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'hypha',
        'USER': 'postgres',
        'PASSWORD': 'root',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}