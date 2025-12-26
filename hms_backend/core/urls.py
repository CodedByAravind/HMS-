from django.urls import path
from .views import (
    DepartmentListCreateAPIView,
    DoctorListAPIView,
    DoctorCreateAPIView,
)

urlpatterns = [
    path("departments/", DepartmentListCreateAPIView.as_view()),
    path("doctors/", DoctorListAPIView.as_view()),
    path("doctors/create/", DoctorCreateAPIView.as_view()),
]
