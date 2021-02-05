# Generated by Django 2.2.16 on 2021-02-05 10:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0005_alter_is_archived_field_on_terms'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='filter_on_dashboard',
            field=models.BooleanField(default=False, help_text='Make available to filter on dashboard'),
        ),
    ]
