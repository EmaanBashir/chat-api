# Generated by Django 3.2.2 on 2021-05-09 03:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0008_remove_thread_updated_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='thread',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ]