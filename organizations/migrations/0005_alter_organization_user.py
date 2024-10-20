# Generated by Django 5.1.2 on 2024-10-18 19:03

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('organizations', '0004_organization_user'),
        ('users', '0006_rename_id_user_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organization',
            name='user',
            field=models.ForeignKey(default=19, on_delete=django.db.models.deletion.CASCADE, related_name='organizations', to='users.user'),
        ),
    ]