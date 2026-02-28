from django.urls import path
from .views import (
    DepartmentListCreateAPIView,
    DoctorListAPIView,
    DoctorCreateAPIView,
    PatientListAPIView,
    PatientCreateAPIView,
    AppointmentListAPIView,
    AppointmentCreateAPIView,
    DoctorAvailabilityCreateAPIView,
)

urlpatterns = [
    path("departments/", DepartmentListCreateAPIView.as_view()),
    
    path("doctors/", DoctorListAPIView.as_view()),
    path("doctors/create/", DoctorCreateAPIView.as_view()),
    
    path("patients/", PatientListAPIView.as_view()),
    path("patients/create/", PatientCreateAPIView.as_view()),
    
    path("appointments/", AppointmentListAPIView.as_view()),
    path("appointments/create/", AppointmentCreateAPIView.as_view()),
    
    path("availability/create/", DoctorAvailabilityCreateAPIView.as_view()),
]
