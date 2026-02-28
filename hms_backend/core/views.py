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
        queryset = Appointment.objects.select_related("doctor", "patient")
        
        if user.is_staff:
            pass
        elif hasattr(user, "doctor"):
            queryset = queryset.filter(doctor__user=user)
        elif hasattr(user, "patient"):
            queryset = queryset.filter(patient__user=user)
        else:
            return Appointment.objects.none()
        
        doctor_id = self.request.query_params.get("doctor")
        date = self.request.query_params.get("date")
        
        if doctor_id:
            queryset = queryset.filter(doctor_id=doctor_id)
        
        if date:
            queryset = queryset.filter(date=date)
        
        return queryset

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
    
    