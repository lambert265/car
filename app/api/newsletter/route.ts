import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Insert into newsletter_subscribers table
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .insert([{ email, subscribed: true }])
      .select()
      .single();

    if (error) {
      // Check if email already exists
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email is already subscribed" },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Successfully subscribed to newsletter",
        data 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to subscribe" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Update subscribed status to false
    const { error } = await supabase
      .from("newsletter_subscribers")
      .update({ subscribed: false })
      .eq("email", email);

    if (error) throw error;

    return NextResponse.json(
      { success: true, message: "Successfully unsubscribed" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Newsletter unsubscribe error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to unsubscribe" },
      { status: 500 }
    );
  }
}
