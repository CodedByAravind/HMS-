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

class PatientCreateSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()
    phone = serializers.CharField()
    address = serializers.CharField()
    
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username Already Exists!")
        return value
        
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            email=validated_data["email"],
        )
        
        patient = Patient.objects.create(
            user=user,
            phone = validated_data["phone"],
            address =validated_data["address"]                        
        )
        
        return patient
    
    
class AppointmentCreateSerializer(serializers.Serializer):
    doctor_id = serializers.IntegerField()
    patient_id = serializers.IntegerField()
    date = serializers.DateField()
    time = serializers.TimeField()
    
    def validate(self, data):
        from .models import Appointment, Doctor, Patient
        
        if not Doctor.objects.filter(id=data["doctor_id"]).exists():
            raise serializers.ValidationError("Doctor does not exists")

        if not Patient.objects.filter(id=data["patient_id"]).exists():
            raise serializers.ValidationError("Patient does not exists")
        
        availability = DoctorAvailability.objects.filter(
            doctor_id=data["doctor_id"],
            date=data["date"],
            start_time__lte=data["time"],
            end_time__gte=data["time"]
        )

        if not availability.exists():
            raise serializers.ValidationError(
                "Doctor is not available at this time."
            )
        
        if Appointment.objects.filter(doctor_id=data["doctor_id"],                                      
                                      date=data["date"],
                                      time=data["time"],
                                      status="BOOKED").exists():
            raise serializers.ValidationError("Doctor has another appointment at this time")
        
        return data
    
    def create(self, validated_data):
        from .models import Appointment
        
        return Appointment.objects.create(
            doctor_id=validated_data["doctor_id"],
            patient_id=validated_data["patient_id"],
            date=validated_data["date"],
            time=validated_data["time"],
        )
    
    
    
    