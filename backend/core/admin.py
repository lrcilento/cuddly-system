from django.contrib import admin

from .models import Album, Track

# Register your models here.
class AlbumAdmin(admin.ModelAdmin):
    list_display = ('albumName', 'bandName', 'releaseYear', 'created', 'updated')


class TrackAdmin(admin.ModelAdmin):
    list_display = ('trackName', 'releaseYear', 'album', 'created', 'updated')


admin.site.register(Album, AlbumAdmin)
admin.site.register(Track, TrackAdmin)