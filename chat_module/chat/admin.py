from django.contrib import admin
from .models import Message, Thread


class MessageInline(admin.StackedInline):
    model = Message
    fields = ('sender', 'msg')
    readonly_fields = ('sender', 'msg')


class ThreadAdmin(admin.ModelAdmin):
    model = Thread
    inlines = (MessageInline,)

admin.site.register(Thread, ThreadAdmin)