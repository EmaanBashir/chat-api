# Generated by Django 3.2.2 on 2021-05-09 01:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0007_alter_thread_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='thread',
            name='updated_at',
        ),
    ]
