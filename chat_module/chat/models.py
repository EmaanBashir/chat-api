from django.db import models
from .managers import ThreadManager, MessageManager
from django.contrib.auth.models import User

class Thread(models.Model):
    THREAD_TYPE = (
        ('personal', 'Personal'),
        ('group', 'Group')
    )
    name = models.CharField(max_length=50, null=True, blank=True)
    thread_type = models.CharField(max_length=15, choices=THREAD_TYPE, default='group')
    users = models.ManyToManyField(User)
    updated_at = models.DateTimeField(null=True)
    unread_count = models.IntegerField(null = True)

    objects = ThreadManager()

    def __str__(self):
        if self.thread_type == 'personal' and self.users.count() == 2:
            return f'{self.users.first()} & {self.users.last()}'
        return f'{self.name}'

    def last_message(self):
        return Message.objects.filter(thread = self).first()

class Message(models.Model):
    thread = models.ForeignKey(Thread, null = True, on_delete=models.CASCADE)
    sender = models.ForeignKey(User, null = True, on_delete=models.CASCADE)
    msg = models.TextField(blank=False, null=False)
    read_by = models.ManyToManyField(User, related_name= "read_messages")
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    objects = MessageManager()

    class Meta:
        ordering = ['-created_at']

    def __str__(self) -> str:
        if len(self.msg) > 40:
            return self.msg[0:40] + ' ...'
        return self.msg

