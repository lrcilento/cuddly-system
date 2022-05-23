from django.db import models

# Create your models here.
class Standard(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class Album(Standard):
    albumName = models.CharField(max_length=255, null=False)
    bandName = models.CharField(max_length=255, null=False)
    releaseYear = models.PositiveIntegerField()

    class Meta:
        verbose_name = 'Album'
        verbose_name_plural = 'Albums'
        ordering = ['id']

    def __str__(self):
        return f'{self.albumName}.'


class Track(Standard):
    trackName = models.CharField(max_length=255, null=False)
    releaseYear = models.PositiveIntegerField()
    album = models.ForeignKey(Album, related_name='tracks', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Track'
        verbose_name_plural = 'Tracks'
        ordering = ['id']

    def __str__(self):
        return f'{self.trackName}.'