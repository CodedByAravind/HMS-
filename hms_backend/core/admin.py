
# Register your models here.
from django.contrib import admin
from .models import (
    Department,
    Doctor,
    Patient,
    DoctorAvailability,
    Appointment,
    Treatment
)

admin.site.register(Department)
admin.site.register(Doctor)
admin.site.register(Patient)
admin.site.register(DoctorAvailability)
admin.site.register(Appointment)
admin.site.register(Treatment)
