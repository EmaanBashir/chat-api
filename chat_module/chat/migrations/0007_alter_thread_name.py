# Generated by Django 3.2.2 on 2021-05-09 01:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0006_alter_thread_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='thread',
            name='name',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
