# Generated by Django 3.2.2 on 2021-05-09 04:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0010_thread_unread_count'),
    ]

    operations = [
        migrations.AlterField(
            model_name='thread',
            name='updated_at',
            field=models.DateTimeField(null=True),
        ),
    ]
