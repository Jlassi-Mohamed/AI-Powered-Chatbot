from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    LANGUAGE_CHOICES = (
        ('en', 'English'),
        ('ar', 'Arabic'),
    )
    language_preference = models.CharField(
        max_length=2,
        choices=LANGUAGE_CHOICES,
        default="en"
    )
