# Generated by Django 3.2 on 2021-05-05 22:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Thread',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=50, null=True)),
                ('thread_type', models.CharField(choices=[('personal', 'Personal'), ('group', 'Group')], default='group', max_length=15)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('users', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('msg', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('read_by', models.ManyToManyField(related_name='read_messages', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('thread', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='frontend.thread')),
            ],
            options={
                'ordering': ['created_at'],
            },
        ),
    ]
