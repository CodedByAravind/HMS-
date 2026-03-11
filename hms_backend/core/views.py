from rest_framework import generics, status
from .models import Department, Doctor, Patient, Appointment, DoctorAvailability, Treatment
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime
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
    TreatmentSerializer,
)



class DoctorAvailabilitySlotsAPIView(APIView):

    def get(self, request, doctor_id):

        date = request.GET.get("date")

        try:
            availability = DoctorAvailability.objects.get(
                doctor_id=doctor_id,
                date=date
            )
        except DoctorAvailability.DoesNotExist:
            return Response([])

        slots = []

        if availability.morning_available:
            slots.append("10:00")

        if availability.evening_available:
            slots.append("16:00")

        return Response(slots)

class DoctorDetailAPIView(APIView):
    def get(self, request, pk):
        try:
            doctor = Doctor.objects.select_related(
                "user",
                "department"
            ).get(id=pk)
            serializer = DoctorSerializer(doctor)
            return Response(serializer.data)

        except Doctor.DoesNotExist:
            return Response(
                {"error": "Doctor not found"},
                status=404
            )


class TreatmentCreateAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        appointment_id = request.data.get("appointment")

        try:
            appointment = Appointment.objects.get(id=appointment_id)
        except Appointment.DoesNotExist:
            return Response({"error": "Appointment not found"}, status=404)

        serializer = TreatmentSerializer(data=request.data)

        if serializer.is_valid():

            treatment = serializer.save(appointment=appointment)

            appointment.status = "COMPLETED"
            appointment.save()

            return Response(
                TreatmentSerializer(treatment).data,
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=400)

class AppointmentDetailAPIView(APIView):

    def get(self, request, pk):

        try:
            appointment = Appointment.objects.get(id=pk)
            serializer = AppointmentSerializer(appointment)
            return Response(serializer.data)

        except Appointment.DoesNotExist:
            return Response({"error": "Appointment not found"}, status=404)

class BlacklistUserAPIView(APIView):

    def post(self, request, user_id):

        try:
            user = User.objects.get(id=user_id)
            user.is_active = False
            user.save()

            return Response({"message": "User blacklisted"})

        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

class PatientDeleteAPIView(APIView):

    def delete(self, request, pk):

        try:
            patient = Patient.objects.get(id=pk)
            patient.user.delete()
            return Response({"message": "Patient deleted"})
        
        except Patient.DoesNotExist:
            return Response({"error": "Patient not found"}, status=404)

class DoctorDeleteAPIView(APIView):

    def delete(self, request, pk):

        try:
            doctor = Doctor.objects.get(id=pk)
            doctor.user.delete()  
            return Response({"message": "Doctor deleted"})
        
        except Doctor.DoesNotExist:
            return Response({"error": "Doctor not found"}, status=404)

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

    serializer_class = DoctorSerializer

    def get_queryset(self):

        queryset = Doctor.objects.select_related("user", "department")

        department = self.request.query_params.get("department")

        if department:
            queryset = queryset.filter(department_id=department)

        return queryset

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
        



class DoctorAvailabilityCreateAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        user = request.user

        try:
            doctor = Doctor.objects.get(user=user)
        except Doctor.DoesNotExist:
            return Response({"error": "Doctor not found"}, status=404)

        data = request.data

        for date, slots in data.items():

            morning = slots.get("morning", False)
            evening = slots.get("evening", False)

            DoctorAvailability.objects.update_or_create(

                doctor=doctor,
                date=date,

                defaults={
                    "morning_available": morning,
                    "evening_available": evening
                }

            )

        return Response({"message": "Availability saved"})
    
    