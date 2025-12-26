from rest_framework import generics, status
from .models import Department, Doctor
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import (
    DepartmentSerializer,
    DoctorSerializer,
    DoctorCreateSerializer,   
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