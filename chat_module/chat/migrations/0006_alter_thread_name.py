# Generated by Django 3.2.2 on 2021-05-09 01:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0005_alter_message_thread'),
    ]

    operations = [
        migrations.AlterField(
            model_name='thread',
            name='name',
            field=models.CharField(blank=True, default='sdf', max_length=50, null=True),
        ),
    ]