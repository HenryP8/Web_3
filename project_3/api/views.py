from .models import User
from .serializers import UserSerializer
from rest_framework import viewsets

class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer