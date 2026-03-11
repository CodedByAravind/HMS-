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
    UserRoleAPIView,
    DoctorDeleteAPIView,
    PatientDeleteAPIView,
    BlacklistUserAPIView,
    AppointmentDetailAPIView,
    TreatmentCreateAPIView,
    DoctorDetailAPIView,
    DoctorAvailabilitySlotsAPIView,
)

urlpatterns = [
    path("departments/", DepartmentListCreateAPIView.as_view()),
    
    
    path("patients/", PatientListAPIView.as_view()),
    path("patients/create/", PatientCreateAPIView.as_view()),
    
    path("appointments/", AppointmentListAPIView.as_view()),
    path("appointments/create/", AppointmentCreateAPIView.as_view()),
    path("availability/create/", DoctorAvailabilityCreateAPIView.as_view()),
    path("user-role/", UserRoleAPIView.as_view()),
    
    path("doctors/", DoctorListAPIView.as_view()),
    path("doctors/create/", DoctorCreateAPIView.as_view()),
    path("doctors/<int:pk>/", DoctorDetailAPIView.as_view()),
    
    path("doctors/<int:pk>/", DoctorDeleteAPIView.as_view()),
    path("patients/<int:pk>/", PatientDeleteAPIView.as_view()),
    path("blacklist/<int:user_id>/", BlacklistUserAPIView.as_view()),
    path("appointment/<int:pk>/", AppointmentDetailAPIView.as_view()),
    path("history/", TreatmentCreateAPIView.as_view()),
    path("availability/<int:doctor_id>/", DoctorAvailabilitySlotsAPIView.as_view()),
]
