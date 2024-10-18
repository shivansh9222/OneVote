from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Contact(models.Model):
    msg_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50,default="")
    email = models.CharField(max_length=50,default="")
    queries = models.TextField(default="")

    def __str__(self):
        return self.name
    
class Party(models.Model):
    party_id = models.AutoField(primary_key=True)
    totalVote = models.IntegerField(default=0)
    name = models.CharField(max_length=50,default="")
    logo = models.URLField(max_length=500,default="")
    description = models.TextField(default="")
    manifestoLink = models.URLField(max_length=500,default="")

    def __str__(self):
        return self.name
    

class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    is_voted = models.BooleanField(default=False)
    voted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Vote by {self.user.username}"