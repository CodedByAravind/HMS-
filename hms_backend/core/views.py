from rest_framework import generics, status
from .models import Department, Doctor, Patient, Appointment, DoctorAvailability
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import (
    DepartmentSerializer,
    DoctorSerializer,
    DoctorCreateSerializer,
    PatientSerializer,
    PatientCreateSerializer,
    AppointmentSerializer,
    AppointmentCreateSerializer,
    DoctorAvailabilitySerializer,
)

class UserRoleAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user

        if hasattr(user, "doctor"):
            return Response({"role": "doctor"})

        if hasattr(user, "patient"):
            return Response({"role": "patient"})

        if user.is_superuser:
            return Response({"role": "admin"})

        return Response({"role": "unknown"})

class DepartmentListCreateAPIView(generics.ListCreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer 


class DoctorListAPIView(generics.ListAPIView):
    queryset = Doctor.objects.select_related("user", "department")
    serializer_class = DoctorSerializer

class DoctorCreateAPIView(APIView):
    def post(self, request):
        serializer = DoctorCreateSerializer(data=request.data)
        if serializer.is_valid():
            doctor = serializer.save()
            return Response(
                DoctorSerializer(doctor).data,
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PatientListAPIView(generics.ListAPIView):
    queryset = Patient.objects.select_related("user")
    serializer_class = PatientSerializer

class PatientCreateAPIView(APIView):
    def post(self, request):
        serializer = PatientCreateSerializer(data=request.data)
        if serializer.is_valid():
            patient = serializer.save()
            return Response(
                PatientSerializer(patient).data,
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AppointmentListAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        user = self.request.user

        if hasattr(user, "doctor"):
            return Appointment.objects.filter(doctor=user.doctor)

        if hasattr(user, "patient"):
            return Appointment.objects.filter(patient=user.patient)

        return Appointment.objects.all()

class AppointmentCreateAPIView(APIView):
    def post(self, request):
        serializer = AppointmentCreateSerializer(data=request.data)
        if serializer.is_valid():
            appointment = serializer.save()
            return Response(
                AppointmentSerializer(appointment).data,
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class DoctorAvailabilityCreateAPIView(generics.CreateAPIView):
    queryset = DoctorAvailability.objects.all()
    serializer_class = DoctorAvailabilitySerializer
    
    