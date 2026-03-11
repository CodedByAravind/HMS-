from django.apps import AppConfig


class CoreConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core"

    def ready(self):
        from .models import Department

        default_departments = [
            "Cardiology",
            "Oncology",
            "Neurology",
            "Orthopedics",
            "General Medicine",
            "Pediatrics",
            "Dermatology",
        ]

        for dept in default_departments:
            Department.objects.get_or_create(name=dept)
