from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'user')

urlpatterns = [
    #path('api/', views.UserView.as_view()),
    path('api/', include(router.urls))
]