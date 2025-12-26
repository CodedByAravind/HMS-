from rest_framework import serializers
from django.contrib.auth.models import User

from .models import (
    Department,
    Doctor,
    Patient,
    DoctorAvailability,
    Appointment,
    Treatment
)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email"
        ]


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = "__all__"


class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    department = DepartmentSerializer(read_only=True)

    class Meta:
        model = Doctor
        fields = "__all__"


class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Patient
        fields = "__all__"


class DoctorAvailabilitySerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer(read_only=True)

    class Meta:
        model = DoctorAvailability
        fields = "__all__"


class AppointmentSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer(read_only=True)
    patient = PatientSerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = "__all__"


class TreatmentSerializer(serializers.ModelSerializer):
    appointment = AppointmentSerializer(read_only=True)

    class Meta:
        model = Treatment
        fields = "__all__"

class DoctorCreateSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True)
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    email = serializers.EmailField()

    department_id = serializers.IntegerField()
    specialization = serializers.CharField(max_length=150)
    experience = serializers.CharField(max_length=100)
    reg_id = serializers.CharField(max_length=50)
    phone = serializers.CharField(max_length=15)

    def create(self, validated_data):
        from django.contrib.auth.models import User
        from .models import Doctor, Department

        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            email=validated_data["email"],
        )

        department = Department.objects.get(id=validated_data["department_id"])

        doctor = Doctor.objects.create(
            user=user,
            department=department,
            specialization=validated_data["specialization"],
            experience=validated_data["experience"],
            reg_id=validated_data["reg_id"],
            phone=validated_data["phone"],
        )

        return doctor
