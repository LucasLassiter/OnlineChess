# Generated by Django 3.2.5 on 2021-07-12 21:45

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_chessgame_max_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chessgame',
            name='code',
            field=models.CharField(default=api.models.generate_unique_code, max_length=8, unique=True),
        ),
        migrations.AlterField(
            model_name='chessgame',
            name='guest_curr_time',
            field=models.DecimalField(decimal_places=2, default=600, max_digits=1000),
        ),
        migrations.AlterField(
            model_name='chessgame',
            name='host_curr_time',
            field=models.DecimalField(decimal_places=2, default=600, max_digits=1000),
        ),
    ]
