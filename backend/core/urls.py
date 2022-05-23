from rest_framework.routers import DefaultRouter

from .views import AlbumViewSet, TrackViewSet

router = DefaultRouter()
router.register('albums', AlbumViewSet, basename='albums')
router.register('tracks', TrackViewSet, basename='tracks')