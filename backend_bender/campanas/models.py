from django.db import models

class Campana(models.Model):
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True, null=True)
    activo = models.BooleanField(default=True)
    imagen = models.ImageField(upload_to='imagenes/', blank=True, null=True)

    def __str__(self):
        return self.nombre
    
class Subcampana(models.Model):
    campana_id = models.ForeignKey(Campana, on_delete=models.CASCADE, related_name='subcampanas')
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True, null=True)
    tipo = models.CharField(max_length=200)
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

class BBVATLMFormalizadas(models.Model):
    dni = models.CharField(max_length=20)
    fecha = models.DateTimeField()
    tarjeta_wf = models.CharField(max_length=100)
    tipo_captacion = models.CharField(max_length=100)
    periodo = models.CharField(max_length=50)
    num_operaciones = models.IntegerField()
    fecha_activacion = models.DateTimeField(null=True)
    periodo_activacion = models.CharField(null=True,max_length=50)
    subcampaña = models.ForeignKey(Subcampana, on_delete=models.CASCADE)

    class Meta:
        unique_together = (('dni', 'periodo', 'fecha'),)
        db_table = 'bbva_tlm_formalizadas'

    def __str__(self):
        return f"{self.dni} - {self.periodo} - {self.fecha}"

class BBVAWebFormalizadas(models.Model):
    dni = models.CharField(max_length=20)
    fecha = models.DateTimeField()
    tarjeta_wf = models.CharField(max_length=100)
    tipo_captacion = models.CharField(max_length=100)
    periodo = models.CharField(max_length=50)
    num_operaciones = models.IntegerField()
    fecha_activacion = models.DateTimeField(null=True)
    periodo_activacion = models.CharField(null=True,max_length=50)
    subcampaña = models.ForeignKey(Subcampana, on_delete=models.CASCADE)

    class Meta:
        unique_together = (('dni', 'periodo', 'fecha'),)
        db_table = 'bbva_web_formalizadas'

    def __str__(self):
        return f"{self.dni} - {self.periodo} - {self.fecha}"

class BBVAPPDesembolsos(models.Model):
    monto_desembolso = models.FloatField()
    fecha = models.DateTimeField()
    dni = models.CharField(max_length=20)
    periodo = models.CharField(max_length=50)
    plaza = models.CharField(max_length=100, blank=True, null=True)
    territorio = models.CharField(max_length=100, blank=True, null=True)
    num_operaciones = models.IntegerField(blank=True, null=True)
    subcampaña = models.ForeignKey(Subcampana, on_delete=models.CASCADE)

    class Meta:
        unique_together = (('dni', 'periodo', 'fecha'),)
        db_table = 'bbva_pp_desembolsos'

    def __str__(self):
        return f"{self.dni} - {self.periodo} - {self.fecha}"

class SBPTLMAprobadas(models.Model):
    dni = models.CharField(max_length=20)
    fecha = models.DateTimeField()
    tipo_tc = models.CharField(max_length=100, blank=True, null=True)
    periodo = models.CharField(max_length=50)
    tiene_oferta_cta_free = models.IntegerField(blank=True, null=True)
    acepta_cta_free = models.IntegerField(blank=True, null=True)
    num_operaciones = models.IntegerField(default=1)
    subcampaña = models.ForeignKey(Subcampana, on_delete=models.CASCADE)

    class Meta:
        unique_together = (('dni', 'periodo', 'fecha'),)
        db_table = 'sbp_tlm_aprobadas'

    def __str__(self):
        return f"{self.dni} - {self.periodo} - {self.fecha}"

class SBPPPDesembolsos(models.Model):
    nro_sol = models.CharField(max_length=100)
    monto_desembolso = models.FloatField()
    fecha = models.DateTimeField()
    periodo = models.CharField(max_length=50)
    zona = models.CharField(max_length=100)
    num_operaciones = models.IntegerField(default=1)
    subcampaña = models.ForeignKey(Subcampana, on_delete=models.CASCADE)

    class Meta:
        unique_together = (('nro_sol', 'periodo', 'fecha'),)
        db_table = 'sbp_pp_desembolsos'

    def __str__(self):
        return f"{self.nro_sol} - {self.periodo} - {self.fecha}"