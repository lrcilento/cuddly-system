from rest_framework import viewsets

from .models import Album, Track
from . serializers import AlbumSerializer, TrackSerializer

# Create your views here.
class AlbumViewSet(viewsets.ModelViewSet):
    """
    Albums
    """
    serializer_class = AlbumSerializer
    queryset = Album.objects.all()


class TrackViewSet(viewsets.ModelViewSet):
    """
    Tracks
    """
    serializer_class = TrackSerializer
    queryset = Track.objects.all()