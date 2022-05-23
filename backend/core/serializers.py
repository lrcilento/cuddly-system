from rest_framework import serializers

from .models import Album, Track

class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = (
            'id',
            'trackName',
            'releaseYear',
            'album'
        )


class AlbumSerializer(serializers.ModelSerializer):
    # Nested Relationship
    tracks = TrackSerializer(many=True, read_only=True)

    class Meta:
        model = Album
        fields = (
            'id',
            'albumName',
            'bandName',
            'releaseYear',
            'tracks'
        )
